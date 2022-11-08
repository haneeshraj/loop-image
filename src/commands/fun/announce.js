const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`announce`)
    .setDescription(`Begins or ends an image announcement`)
    .addSubcommand((option) =>
      option.setName("start").setDescription("Starts the looping")
    )
    .addSubcommand((option) =>
      option.setName("stop").setDescription("Stops the looping")
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    if (client.announcements.length === 0) return;
    if (interaction.options.getSubcommand() === "start") {
      client.announcements.forEach((item) => {
        var i = setInterval(async () => {
          const boom = await item.channel.send({ files: [item.image] });
          const timer = setTimeout(async () => {
            await boom.delete();
            clearTimeout(timer);
          }, 5000);
          client.intervals.push(i);
        }, 5000);
      });
      return interaction.reply({
        emphemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("Loop Begins")
            .setDescription("The image looping has begun!"),
        ],
      });
    }
    if (interaction.options.getSubcommand() === "stop") {
      //   console.log(client.intervals);
      client.intervals.forEach(clearInterval);
      client.intervals.forEach(clearInterval);
      return interaction.reply({
        emphemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("Loop Stops")
            .setDescription("The image looping has stopped!"),
        ],
      });
    }
  },
};
