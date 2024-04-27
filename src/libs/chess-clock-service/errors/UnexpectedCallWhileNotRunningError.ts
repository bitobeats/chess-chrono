import { ChessClockError } from "./ChessClockError";

export class UnexpectedCallWhileNotRunningError extends ChessClockError {
  name = "UnexpectedCallWhileNotRunningError";
}
