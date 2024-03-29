import { Router } from "express";
import Users from "../../models/users";
import { compareHash, generateHash } from "../../utils/encryption";
import { generateToken } from "../../utils/jwt";
import { Request, jwtPurposeEnum } from "../../types";
import { resetValidator } from "../../middlewares/authValidator";
import { authErrors } from "../../constants/errors";

const authController = Router();

authController.post("/signup", async (req, res) => {
  try {
    let data = req.body;
    data.password = await generateHash(data.password);
    const created = await Users.create(data);
    const jwtoken = await generateToken({
      _id: created._id,
      roles: created.roles,
    });

    res.cookie("access_token", jwtoken, {
      // secure: true,
      httpOnly: true,
    });
    res.status(200).json({ token: jwtoken, user: created });
  } catch (error: any) {
    if (error.code === 11000)
      res.status(400).json(authErrors.duplicate("Email"));
    else {
      res.status(400).json(null);
    }
  }
});

authController.post("/signin", async (req, res) => {
  try {
    let { identifier, password } = req.body;
    const found = await Users.findOne({ email: identifier });

    if (!found) res.status(404).json(authErrors.credentialMismatch());
    else {
      const match = await compareHash(password, found?.password!);

      if (!match) res.status(404).json(authErrors.credentialMismatch());
      else {
        const jwtoken = await generateToken({
          _id: found?._id,
          roles: found.roles,
        });

        res.cookie("access_token", jwtoken, {
          // secure: true,
          httpOnly: true,
        });
        res.status(200).json({ token: jwtoken, user: found });
      }
    }
  } catch (error) {
    res.status(400).json(null);
  }
});

authController.post("/forgot", async (req, res) => {
  try {
    let { identifier } = req.body;
    const found = await Users.findOne({ email: identifier });

    if (!found) res.status(404).json(null);
    else {
      const resetToken = await generateToken(
        { _id: found?._id },
        jwtPurposeEnum.reset
      );
      // email the token some way maybe reset password link, this is valid for 5min

      res.cookie("reset_token", resetToken, {
        // secure: true,
        httpOnly: true,
      });
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(400).json(null);
  }
});

authController.post("/reset", resetValidator, async (req: Request, res) => {
  try {
    let { password } = req.body;
    password = await generateHash(password);
    const updated = await Users.findByIdAndUpdate(
      req.user?._id,
      { password },
      { new: true }
    );

    if (!updated) res.status(404).json(null);
    else {
      const jwtoken = await generateToken({
        _id: updated?._id,
        roles: updated.roles,
      });

      res.clearCookie("reset_token");
      res.cookie("access_token", jwtoken, {
        // secure: true,
        httpOnly: true,
      });
      res.status(200).json({ token: jwtoken, user: updated });
    }
  } catch (error) {
    res.status(400).json(null);
  }
});

export default authController;
