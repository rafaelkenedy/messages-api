import { serverHttp } from "./app";

const PORT = 3333;

serverHttp.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}
);