import {Session} from "../Session/Session";
import { Presentation } from "./Presentation";

export default function HomePage() {
  return( 
    <div>
        <Presentation />
        <Session />
    </div>
    );
}
