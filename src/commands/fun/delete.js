const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`delete`)
    .setDescription(`Deletes a label`)
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the image context")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const name = interaction.options.getString("name");

    let labels = client.announcements.map((item) => item.name);
    if (!labels.includes(name))
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Label doesn't exists")
            .setDescription("Please give a valid label to delete!"),
        ],
      });

    client.announcements = client.announcements.filter(
      (item) => item.name !== name
    );

    return interaction.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setTitle("Successfully Removed")
          .setDescription("Successfully removed label!"),
      ],
    });
  },
};
