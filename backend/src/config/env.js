import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, "../.env"),
];

for (const envPath of envCandidates) {
    const result = dotenv.config({ path: envPath });

    if (!result.error) {
        break;
    }
}
