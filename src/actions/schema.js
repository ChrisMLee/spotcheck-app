import { normalize, schema } from "normalizr";

export const place = new schema.Entity("places");

export const list = new schema.Entity("lists", {
  places: [place]
});
