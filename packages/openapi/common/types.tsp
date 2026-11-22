namespace Common;

@format("uuid")
scalar Uuid extends string;

@format("email")
scalar Email extends string;

model Timestamps {
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}
