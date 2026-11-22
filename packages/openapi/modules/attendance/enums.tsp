namespace MathInsight;

enum AttendanceStatus {
  present: "present",
  late: "late",
  absent: "absent",
  excused: "excused",
}

enum AttendanceMethod {
  qr: "qr",
  manual: "manual",
  system: "system",
}

enum QrScanOutcome {
  recorded: "recorded",
  already_recorded: "already_recorded",
}
