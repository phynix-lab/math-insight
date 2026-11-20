namespace Common;

@format("uuid")
scalar Uuid extends string;

model Timestamps {
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}
