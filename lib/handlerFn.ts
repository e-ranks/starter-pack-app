// handlerFn.ts
import { NextRequest } from "next/server";

export type handlerFn = (req: NextRequest) => Promise<Response>;