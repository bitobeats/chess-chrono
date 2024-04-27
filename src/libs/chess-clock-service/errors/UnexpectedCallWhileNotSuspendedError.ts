import { ChessClockError } from "./ChessClockError";

export class UnexpectedCallWhileNotSuspendedError extends ChessClockError {
  name = "UnexpectedCallWhileNotSuspendedError";
}
