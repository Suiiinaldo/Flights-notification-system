const express = require("express");

const { ServerConfig, Logger } = require("./config");

const apiRoutes = require("./routes");

const mailSender = require("./config/email-config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  // Logger.info("Successfully started the server", "root", { msg: "something" });
  try {
    let message = {
      from: ServerConfig.MAIL_ID,
      to: 'sushrutnarayansingh@gmail.com',
      subject: 'Is the sevice working ?',
      text: 'Hooray! The service is working.',
      html: `<p><b>Hello</b><img src="cid:note@example.com"/></p>
        <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="https://cldup.com/D72zpdwI-i.gif"/></p>`,
    }
    const response = await mailSender.sendMail(message);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
