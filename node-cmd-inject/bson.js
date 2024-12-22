import { BSON } from "bson";

const json = { hello: "world" };

const bson = BSON.serialize(json);

console.log(bson);
// Complete Breakdown of Your BSON Buffer:
// 16 00 00 00: Total document size (22 bytes)
// 02: Field type (String)
// 68 65 6c 6c 6f 00: Field name "hello" (null-terminated)
// 06 00 00 00: String value length (6 bytes, including null terminator)
// 77 6f 72 6c 64 00: String value "world" (null-terminated)
// 00: End of document
