import { Hono } from "hono";
import { db } from "../db";

export const categoryRoute = new Hono()
  .get('/', async c => {
    const categories = await db.category.findMany();
    return c.json(categories);
  })
  .get('/:id', async c => {
    const id = c.req.param('id');
    const category = await db.category.findUnique({ where: { id } });
    return c.json(category);
  })
  .post('/', async c => {
    const data = await c.req.json();
    const category = await db.category.create({ data });
    return c.json(category);
  })
  .put('/:id', async c => {
    const id = c.req.param('id');
    const data = await c.req.json();
    const category = await db.category.update({ where: { id }, data });
    return c.json(category);
  })
  .delete('/:id', async c => {
    const id = c.req.param('id');
    const category = await db.category.delete({ where: { id } });
    return c.json(category);
  })
