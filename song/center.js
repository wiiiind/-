// http://localhost:3000




window.onload = function () {
    //获取歌曲id

    console.log("已读取center.js")

    var url = window.location.href;
    var songID = url.match(/id=(\d+)/)[1];

    var fee;
    var SongName;
    var AlbumName;
    var picUrl;
    var SingerName;
    var SingerID;
    var AudioUrl;
    var SpecificLyrics;
    var lyricsLines;
    var lyricsDiv;
    var UserNickname;
    var UserAvatar;
    var UserID;
    var Content;
    var CommentDate;
    var LikeCount;


    async function fetchData() { //一趴烂屎，什么东西全都在里面/
        let res = await fetch("http://localhost:3000/song/detail?ids=" + songID);
        let data = await res.json();
        SongName = data.songs[0].name;
        albumID = data["songs"][0]["al"]["id"];
        AlbumName = data["songs"][0]["al"]["name"];
        picUrl = data['songs'][0]['al']['picUrl'];
        SingerName = data.songs[0].ar[0].name;
        SingerID = data.songs[0].ar[0].id;
        fee = data.privileges[0].fee;
        if (fee === 1) {
            alert("这是VIP歌曲，登录后畅听正版歌曲");
        } else if (fee === 4) {
            alert("这首歌要购买专辑后才能收听，登录后畅听正版歌曲");
        }
        res = await fetch("http://localhost:3000/song/url?id=" + songID);
        data = await res.json();
        AudioUrl = data.data[0].url;
        res = await fetch("http://localhost:3000/lyric?id=" + songID);
        data = await res.json();
        SpecificLyrics = data["lrc"]["lyric"];
        SpecificLyrics = SpecificLyrics.replace(/\[\d{2}:\d{2}\.\d{3}\] /g, '');
        SpecificLyrics = SpecificLyrics.replace(/\[[0-9][0-9]:[0-9][0-9]\.[0-9][0-9][0-9]\]\n/g, "");
        lyricsLines = SpecificLyrics.split('\n');
        lyricsDiv = document.querySelector('.lyric');
        lyricsDiv.innerHTML = '';
        for (var i = 0; i < lyricsLines.length; i++) {
            var p = document.createElement('p');
            p.textContent = lyricsLines[i];
            lyricsDiv.appendChild(p);
        }


        document.querySelector(".album-art img").src = picUrl;
        document.querySelector(".SongName").textContent = SongName;
        document.querySelector(".SingerName").textContent = SingerName;
        document.title = SongName + " - " + SingerName + " - 单曲 - 网易云音乐";
        document.querySelector(".SingerName").href = "https://music.163.com/#/artist?id=" + SingerID;
        document.querySelector(".AlbumName").textContent = AlbumName;
        document.querySelector(".AlbumName").href = "https://music.163.com/#/album?id=" + SingerID;
        document.querySelector("audio").src = AudioUrl;

        res = await fetch("http://localhost:3000/comment/music?id=" + songID)
        data = await res.json();
        document.querySelector(".CommentNumber").textContent = "共" + data.total + "条评论";


        res = await fetch("http://localhost:3000/comment/hot?id=" + songID + "&type=0&limit=5")
        data = await res.json();
        console.log(data);
        UserNickname = data.hotComments.map(comment => comment.user.nickname);
        UserAvatar = data.hotComments.map(item => item.user.avatarUrl);
        UserID = data.hotComments.map(comment => comment.user.userId);
        Content = data.hotComments.map(comment => comment.content);
        CommentDate = data.hotComments.map(comment => comment.timeStr);
        LikeCount = data.hotComments.map(comment => comment.likedCount);
        currentIndex = 0


        for (currentIndex = 0; currentIndex < 5; currentIndex++) {
            document.querySelector(".HotComment" + currentIndex + " .UserAvatar img").src = UserAvatar[currentIndex];
            document.querySelector(".HotComment" + currentIndex + " .UserAvatar img").style.width = "50px";

            if (LikeCount[currentIndex] < 100000) {
                LikeCount[currentIndex] = "👍 （" + LikeCount[currentIndex] + "）";
            } else if (LikeCount[currentIndex] >= 100000 && LikeCount[currentIndex] < 1000000) {
                LikeCount[currentIndex] = "👍 （" + (Math.round((LikeCount[currentIndex] / 10000) * 10) / 10) + "万）";
            } else {
                LikeCount[currentIndex] = "👍 （" + Math.floor(LikeCount[currentIndex] / 10000) + "万）";
            }

            document.querySelector(".HotComment" + currentIndex + " .LikeNumber").textContent = LikeCount[currentIndex];



            document.querySelector(".HotComment" + currentIndex + " .UserNickname").href = ("https://music.163.com/#/user/home?id=" + UserID[currentIndex]);
            document.querySelector(".HotComment" + currentIndex + " .UserNickname").textContent = UserNickname[currentIndex];

            var Content3 = document.querySelector(".HotComment" + currentIndex + " .CommentContent3");
            document.querySelector(".HotComment" + currentIndex + " .UserAvatar img").src = UserAvatar[currentIndex];
            Content3.textContent = Content[currentIndex];

            document.querySelector(".HotComment" + currentIndex + " .CommentDate").textContent = CommentDate[currentIndex];

        }




            const expandBtn = document.querySelector(".expand-btn");
            const collapseBtn = document.querySelector(".collapse-btn");
            // 获取歌词行数
            const lineCount = lyricsDiv.offsetHeight / 25;
            if (lineCount > 10) {
                lyricsDiv.style.height = "250px";
                expandBtn.style.display = "block";
                expandBtn.addEventListener("click", function () {
                    // 显示全部歌词
                    lyricsDiv.style.height = "auto";
                    expandBtn.style.display = "none";
                    collapseBtn.style.display = "block";
                });
                collapseBtn.addEventListener("click", function () {
                    // 恢复只显示10行
                    lyricsDiv.style.height = "250px";
                    expandBtn.style.display = "block";
                    collapseBtn.style.display = "none";
                });
            } else {
                // 歌词行数不大于10，全部显示
                lyricsDiv.style.height = "auto";
            }



        }


    fetchData();




}

