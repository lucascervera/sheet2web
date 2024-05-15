function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("YouTube Import")
    .addItem("Import YouTube channel data", "importYouTubeData")
    .addToUi();
}

function importYouTubeData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    var apiKey = sheet.getRangeByName("API_KEY").getValue();
    var channelId = sheet.getRangeByName("CHANNEL_ID").getValue();
    Logger.log("API Key: " + apiKey);
    Logger.log("Channel ID: " + channelId);
  } catch (e) {
    SpreadsheetApp.getUi().alert(
      "Error reading API_KEY or CHANNEL_ID: " + e.message
    );
    Logger.log("Error: " + e.message);
    return;
  }

  try {
    var dataSheet = sheet.getSheetByName("import");
    if (!dataSheet) {
      throw new Error('Sheet "import" not found.');
    }
    dataSheet.clear(); // Clear the sheet before importing data
    dataSheet.appendRow([
      "ID",
      "TITLE",
      "DESCRIPTION",
      "TAGS",
      "CONTENT",
      "IMAGE",
      "DATE",
      "VIEWS",
      "LIKES",
      "DURATION",
      "COMMENT COUNT",
      "LANGUAGE",
      "PUBLISHED DATE",
      "FAVORITES",
      "CATEGORY ID",
      "VIDEO STATUS",
      "CHANNEL NAME",
      "CHANNEL URL",
      "THUMBNAIL URL",
    ]); // Column headers
  } catch (e) {
    SpreadsheetApp.getUi().alert("Error preparing data sheet: " + e.message);
    Logger.log("Error: " + e.message);
    return;
  }

  try {
    var channelInfoUrl =
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=" +
      channelId +
      "&key=" +
      apiKey;
    var channelResponse = UrlFetchApp.fetch(channelInfoUrl);
    var channelJson = JSON.parse(channelResponse.getContentText());
    Logger.log("Channel Info Response: " + channelResponse.getContentText());

    if (!channelJson.items || channelJson.items.length === 0) {
      SpreadsheetApp.getUi().alert(
        "No se encontró el canal con el ID proporcionado."
      );
      return;
    }

    var uploadsPlaylistId =
      channelJson.items[0].contentDetails.relatedPlaylists.uploads;
    var nextPageToken = "";
    do {
      var playlistItemsUrl =
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" +
        uploadsPlaylistId +
        "&maxResults=50&pageToken=" +
        nextPageToken +
        "&key=" +
        apiKey;
      var playlistResponse = UrlFetchApp.fetch(playlistItemsUrl);
      var playlistJson = JSON.parse(playlistResponse.getContentText());
      var items = playlistJson.items;
      Logger.log(
        "Playlist Items Response: " + playlistResponse.getContentText()
      );

      items.forEach(function (item) {
        var ID = item.snippet.resourceId.videoId;

        var videoDetailsUrl =
          "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&id=" +
          ID +
          "&key=" +
          apiKey;
        var videoDetailsResponse = UrlFetchApp.fetch(videoDetailsUrl);
        var videoDetailsJson = JSON.parse(
          videoDetailsResponse.getContentText()
        );
        Logger.log(
          "Video Details Response: " + videoDetailsResponse.getContentText()
        );

        var videoDetails = videoDetailsJson.items[0];
        var snippet = videoDetails.snippet;
        var contentDetails = videoDetails.contentDetails;
        var statistics = videoDetails.statistics;
        var status = videoDetails.status;

        var TITLE = snippet.title;
        var DESCRIPTION = snippet.description;
        var TAGS = snippet.tags ? snippet.tags.join(", ") : "No Tags";
        var IMAGE = snippet.thumbnails.high.url;
        var DATE = snippet.publishedAt;
        var CONTENT = "https://www.youtube.com/embed/" + ID;
        var VIEWS = statistics.viewCount;
        var LIKES = statistics.likeCount;
        var DURATION = contentDetails.duration;
        var COMMENT_COUNT = statistics.commentCount;
        var LANGUAGE = snippet.defaultAudioLanguage || snippet.defaultLanguage;
        var PUBLISHED_DATE = snippet.publishedAt;
        var FAVORITES = statistics.favoriteCount; // YouTube API usually returns 0 for this field
        var CATEGORY_ID = snippet.categoryId;
        var VIDEO_STATUS = status.uploadStatus;
        var CHANNEL_NAME = snippet.channelTitle;
        var CHANNEL_URL = "https://www.youtube.com/channel/" + channelId;
        var THUMBNAIL_URL = snippet.thumbnails.high.url;

        dataSheet.appendRow([
          ID,
          TITLE,
          DESCRIPTION,
          TAGS,
          CONTENT,
          IMAGE,
          DATE,
          VIEWS,
          LIKES,
          DURATION,
          COMMENT_COUNT,
          LANGUAGE,
          PUBLISHED_DATE,
          FAVORITES,
          CATEGORY_ID,
          VIDEO_STATUS,
          CHANNEL_NAME,
          CHANNEL_URL,
          THUMBNAIL_URL,
        ]);
      });

      nextPageToken = playlistJson.nextPageToken;
    } while (nextPageToken);
  } catch (e) {
    SpreadsheetApp.getUi().alert(
      "Error during YouTube API calls: " + e.message
    );
    Logger.log("Error: " + e.message);
  }
}
