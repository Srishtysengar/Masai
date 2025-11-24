interface StreamAsset {
  execute(): void;
}


class SoundTrack implements StreamAsset {
  execute(): void {
    console.log("Playing audio file...");
  }
}

class FilmClip implements StreamAsset {
  execute(): void {
    console.log("Playing video file...");
  }
}

class DocumentPage implements StreamAsset {
  execute(): void {
    console.log("Displaying PDF document...");
  }
}

class ContentPlayer {
  private resource: StreamAsset;

  constructor(resource: StreamAsset) {
    this.resource = resource;
  }

  launch(): void {
    this.resource.execute();
  }
}



const jukebox = new ContentPlayer(new SoundTrack());
jukebox.launch(); 

const theatreBox = new ContentPlayer(new FilmClip());
theatreBox.launch();

const readerDesk = new ContentPlayer(new DocumentPage());
readerDesk.launch(); 
