import bcrypt from "bcryptjs";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { decode, sign } from "hono/jwt";
import { db } from "../db";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};
type LoginProps = Omit<RegisterProps, "name">;

export const authRoute = new Hono()
  .post("/register", async (c) => {
    const body = (await c.req.json()) as RegisterProps;
    // check user exist
    const exist = await db.user.findFirst({ where: { email: body.email } });
    if (exist) return c.json({ msg: "این ایمیل قبلا ثبت شده!" }, 400);
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hassPassword = bcrypt.hashSync(body.password, salt);
    // create new user
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hassPassword,
      },
    });
    // create token
    const secret = String(process.env.SECRET);
    const payload = { id: user.id, name: user.name };
    const token = await sign(payload, secret);
    setCookie(c, "token", token);
    return c.json({ user, msg: "حساب کاربری شما ایجاد شد!" });
  })
  .post("/login", async (c) => {
    const body = (await c.req.json()) as LoginProps;
    // check user exist on db
    const exist = await db.user.findFirst({ where: { email: body.email } });
    if (!exist) return c.json({ msg: "ایمیل شما یافت نشد!" }, 400);
    // check password
    const isPasswordCorrect = bcrypt.compareSync(body.password, exist.password);
    if (!isPasswordCorrect) return c.json({ msg: "رمز عبور اشتباهه!" }, 400);
    // create token
    const secret = String(process.env.SECRET);
    const payload = { id: exist.id, name: exist.name };
    const token = await sign(payload, secret);
    setCookie(c, "token", token);
    return c.json({ data: exist, msg: "شما با موفقیت وارد شدید!" });
  })
  .get("/profile", async (c) => {
    const token = String(getCookie(c, "token"));
    const decoded = await decode(token);
    const user = await db.user.findFirst({
      where: { id: String(decoded.payload.id) },
    });
    return c.json(user);
  })
  .put("/profile", async (c) => {
    const data = await c.req.json();
    const tokenCookie = String(getCookie(c, "token"));
    const decoded = await decode(tokenCookie);
    // update user
    const user = await db.user.update({
      where: { id: String(decoded.payload.id) },
      data,
    });
    // create new token for after updated
    const secret = String(process.env.SECRET);
    const payload = { id: user.id, name: user.name };
    const token = await sign(payload, secret);
    setCookie(c, "token", token);
    return c.json({ user, msg: "حساب کاربری شما با موفقیت ویرایش شد!" });
  });
