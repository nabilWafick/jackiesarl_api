class OpenFileController {
  static open = async (req, res) => {
    const file_link = req.params.file_link;

    try {
      const open = await import("open");
      //await open.default("https://sindresorhus.com");
      await open.default(
        file_link,
        //  { wait: true },
        { app: { name: "google chrome" } }
      );
      console.log("L'application de visualisation de fichiers s'est fermée");
    } catch (error) {
      console.error("Erreur lors de l'ouverture du fichier : " + error.message);
    }
  };
}

module.exports = OpenFileController;
