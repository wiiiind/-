window.onload = function () {

    var InputBox = document.querySelector(".InputBox")
    var SearchButton = document.querySelector(".SearchButton")
    SearchButton.addEventListener("click", function () {
        var InputValue = InputBox.value;
        console.log(InputValue)
        if (InputValue == "") {
            alert("请输入你要搜索的歌曲名")
        }
        else {
            window.location.href = "search.html?" + InputBox.value;
        }
    })


    async function fetchData() { //一趴烂屎，什么东西全都在里面/
        var currentUrl = window.location.href;
        if (currentUrl.indexOf('?') !== -1) {  //搜索模式
            var SearchKeyword = currentUrl.split("?")[1];
            InputBox.value = decodeURIComponent(SearchKeyword);
            console.log(SearchKeyword)
            document.querySelector(".SearchKeyword").textContent = decodeURIComponent(SearchKeyword);
            document.querySelector(".HotSearch").style.display = "none";
            document.querySelector(".SearchResult").style.display = "div";
            res = await fetch("http://localhost:3000/search?keywords=" + SearchKeyword + "&type=1&limit=20");
            data = await res.json();

            var SongName = data.result.songs.map(song => song.name)
            var SongID = data.result.songs.map(song => song.id);
            var Singer = data.result.songs.map(song => song.artists.map(artist => artist.name));
            var SingerID = data.result.songs.map(song => song.artists.map(artist => artist.id));
            var album = data.result.songs.map(song => song.album.name);
            var albumID = data.result.songs.map(song => song.album.id);
            var length = data.result.songs.map(song => song.duration);
            console.log(Singer);

            for (currentIndex = 0; currentIndex < 20; currentIndex++) {

                //歌名
                document.querySelector(".result" + currentIndex + " .SongName").textContent = SongName[currentIndex];
                document.querySelector(".result" + currentIndex + " .SongName").href = "../song/song.html?id=" + SongID[currentIndex];

                //歌手
                let array = Singer[currentIndex];
                let arrayID = SingerID[currentIndex];
                let parentSpan = document.querySelector(".result" + currentIndex + " .Singer");
                console.log(parentSpan);
                if (array.length === 1) {
                    parentSpan.textContent = array[0];
                    parentSpan.href = "https://music.163.com/#/artist?id=" + arrayID[0];
                } else if (array.length > 1) {
                    parentSpan.innerHTML = '';
                    for (let i = 0; i < array.length; i++) {
                        // 创建一个新的span元素
                        const childSpan = document.createElement('a');
                        // 设置该span元素的class, textContent, href
                        childSpan.className = `singer${i}`;
                        childSpan.textContent = array[i];
                        childSpan.href = "https://music.163.com/#/artist?id=" + arrayID[i];
                        // 将该span元素追加到父元素span中
                        parentSpan.appendChild(childSpan);
                        // 如果该位置不是数组最后一个位置，则创建一个分隔元素
                        if (i !== array.length - 1) {
                            const sepSpan = document.createElement('span');
                            sepSpan.className = 'sepr';
                            sepSpan.textContent = '/';
                            parentSpan.appendChild(sepSpan);
                        }
                    }

                }


                // 专辑
                document.querySelector(".result" + currentIndex + " .album").textContent = "《" + album[currentIndex] + "》";
                document.querySelector(".result" + currentIndex + " .album").href = "https://music.163.com/#/album?id=" + albumID[currentIndex];

                // 时长
                let minutes = Math.floor(length[currentIndex] / 1000 / 60);
                let seconds = Math.floor(length[currentIndex] / 1000 % 60);
                let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                document.querySelector(".result" + currentIndex + " .length").textContent = formattedTime;

                //背景颜色灰白相间
                if (currentIndex % 2 !== 0 && currentIndex >= 0 && currentIndex <= 19) {
                    document.querySelector(".result" + currentIndex).style.backgroundColor = 'rgb(247,247,247)';
                }
            }

        }
        else {             //热搜榜
            document.querySelector(".SearchResult").style.display = "none";
            document.querySelector(".HotSearch").style.display = "div";
            document.querySelector(".center").style.height = "1425px";
            let res = await fetch("http://localhost:3000/search/hot/detail");
            let data = await res.json();
            var searchWords = data.data.map(item => item.searchWord);
            var icon = data.data.map(item => item.iconUrl);
            var score = data.data.map(item => item.score);
            var content = data.data.map(item => item.content);
            for (currentIndex = 0; currentIndex < 20; currentIndex++) {
                document.querySelector(".Hot" + currentIndex + " .rank").textContent = currentIndex + 1;
                document.querySelector(".Hot" + currentIndex + " .detail .SearchWord").textContent = searchWords[currentIndex];
                document.querySelector(".Hot" + currentIndex).href = "search.html?" + searchWords[currentIndex];
                if (icon[currentIndex] !== null) {
                    document.querySelector(".Hot" + currentIndex + " .detail .icon img").src = icon[currentIndex];
                } else {
                    document.querySelector(".Hot" + currentIndex + " .detail .icon img").style.display = "none";
                }
                document.querySelector(".Hot" + currentIndex + " .detail .score").textContent = score[currentIndex];
                document.querySelector(".Hot" + currentIndex + " .detail .content").textContent = content[currentIndex];
            }

        }


    }
    fetchData();


}