const express = require("express");
const { EmailService } = require("./services");
const { ServerConfig, Logger } = require("./config");
const amqplib = require("amqplib");

async function connectQueue(){
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(ServerConfig.MESSAGE_QUEUE);
    channel.consume(ServerConfig.MESSAGE_QUEUE, async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      // console.log(object);
      await EmailService.sendEmail(ServerConfig.MAIL_ID, object.recepientEmail,object.subject,object.content);
      // channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}


const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  // Logger.info("Successfully started the server", "root", { msg: "something" });
  console.log("Queue Connected");
  await connectQueue();
});
