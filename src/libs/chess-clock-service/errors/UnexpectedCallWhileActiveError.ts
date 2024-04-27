import { ChessClockError } from "./ChessClockError";

export class UnexpectedCallWhileActiveError extends ChessClockError {
  name = "UnexpectedCallWhileActiveError";
}
