import { generateIdentityToken, generateIdentityTokenLowerCase } from "../types";

export const TOKENS = [
    { symbol: "COMPONENT_DEC_TITLE_HEADER", regex: "component_dec:" },
    { symbol: "SYSTEM_INIT_TITLE", regex: "ststem_init:" },
    { symbol: "SYSTEM_LOOP_TITLE", regex: "ststem_loop:" },
  ...(
    ["ROOT" ,"LINE", "LINES", "BLOCK", "BLOCKS", "END", "SET_VALUE_COMMAND",
]
    .map(token => generateIdentityToken(token))
  ),
  ...(
    ["SET",
    "AS" ,"PRESS" , "PLAYER" , 
    "UP", "DOWN", "LEFT", "RIGHT",
    "FOR" ,"VAR", "IN", "STRING", "NUMBER"]
    .map(token => generateIdentityTokenLowerCase(token))
  ),

  { symbol: "CURL_OPEN", regex: "{" },
  { symbol: "CURL_CLOSE" , regex: "}" },
  { symbol: "COLON", regex: ":" },
  { symbol: "ARROW", regex: "=>" },
  { symbol: "EQUAL", regex: "=" },
  { symbol: "NAME" , regex: "[a-zA-Z]+" },
  { symbol: "NUMBER" , regex: "[0-9]+" },
]