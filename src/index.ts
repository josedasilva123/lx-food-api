import { connect } from "./database/database"
import { serverHttp } from "./server";

const port = process.env.PORT || 3030;

serverHttp.listen(port, async () => {
    await connect();
    console.log(`Aplicação iniciada com sucesso na porta: ${port}`);
})
