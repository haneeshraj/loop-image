const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(true)
    .setName(`set`)
    .setDescription(`Sets a announce command`)
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the image context")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to be announced")
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("Image to be announced")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    try {
      if (!interaction.isChatInputCommand()) return;
      const name = interaction.options.getString("name");
      const channel = interaction.options.getChannel("channel");
      const image = interaction.options.getAttachment("image");

      let labels = client.announcements.map((item) => item.name);

      if (labels.includes(name))
        return interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setTitle("Label already exists")
              .setDescription("Please give a unique label for the image!"),
          ],
        });

      client.announcements.push({
        name,
        channel,
        image,
      });
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle("Label successfully created")
            .setDescription(
              `**${name}** has been successfully created! Please use /list to see all the available labels!`
            )
            .setImage(image.url),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
