const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`list`)
    .setDescription(`Gives a list of all the available labels`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    let listOfLabels = [];

    if (client.announcements.length === 0)
      return interaction.reply({
        ephemeral: true,
        content: "There are no labels set",
      });

    client.announcements.forEach((item) => {
      listOfLabels.push({
        name: item.name,
        value: item.channel.name,
        inline: true,
      });
    });
    return interaction.reply({
      ephemeral: true,
      embeds: [new EmbedBuilder().setFields(listOfLabels)],
    });
  },
};
