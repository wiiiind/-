window.onload = function () {


    //album-slider
    const slider = document.querySelector('.album-slider');
    let currentPage = 0;

    document.querySelector('#next').addEventListener('click', () => {
        currentPage = (currentPage + 1) % 2;
        slider.style.transform = `translateX(-${currentPage * 660}px)`;
    });

    document.querySelector('#prev').addEventListener('click', () => {
        currentPage = (currentPage + 1) % 2;
        slider.style.transform = `translateX(${currentPage * 660}px)`;
    });


    //banner
    var currentIndex = 0;
    var currentPhoto = document.getElementById("current-photo");
    var photos = [];
    var targetType = [];
    var targetId = [];
    var url = [];
    var name;
    var id;
    var picUrl;
    var playCount;
    var currentIndex = 0;



    async function fetchData() {
        var res = await fetch("http://localhost:3000/banner");
        var data = await res.json();
        photos = data.banners.map(banner => banner.imageUrl)
        targetType = data.banners.map(banner => banner.targetType)
        targetId = data.banners.map(banner => banner.targetId)
        url = data.banners.map(banner => banner.url)
        updateCurrentPhoto();
        res = await fetch("http://localhost:3000/personalized?limit=8");
        data = await res.json();
        name = data.result.map(result => result.name)
        id = data.result.map(result => result.id)
        picUrl = data.result.map(result => result.picUrl)
        playCount = data.result.map(result => result.playCount)
        updateUI();
        res = await fetch("http://localhost:3000/album/new?limit=10");
        data = await res.json();
        console.log(data);
        name = data.result.map(result => result.name)
    }

    function updateCurrentPhoto() {
        currentPhoto.src = photos[currentIndex];
        var parent = document.querySelector('#current-photo').parentNode;
        if (targetType[currentIndex] === 3000) {
            parent.href = url[currentIndex];
        }
        if (targetType[currentIndex] === 1) {
            parent.href = "../song/song.html?id="+targetId[currentIndex];
        }
        if (targetType[currentIndex] === 10) {
            parent.href = `https://music.163.com/#/album?id=${targetId[currentIndex]}`;
        }
    }
    fetchData();


    function updateUI() {
        for (currentIndex = 0; currentIndex < name.length; currentIndex++) {
            document.querySelector("#list" + currentIndex + " a div img").src = picUrl[currentIndex];
            if (playCount[currentIndex] >= 10000) {
                playCount[currentIndex] = "🎧" + Math.floor(playCount[currentIndex] / 10000) + "万";
            } else {
                playCount[currentIndex] = "🎧" + playCount[currentIndex];
            }
            document.querySelector("#list" + currentIndex + " a div div span").textContent = playCount[currentIndex];
            document.querySelector("#list" + currentIndex + " a ").href = `https://music.163.com/#/playlist?id=${id[currentIndex]}`;
            document.querySelector("#list" + currentIndex + " a p").textContent = name[currentIndex];
            document.querySelector("#list" + currentIndex + " a").title = name[currentIndex];
        }
    }

    var prevBtn = document.getElementById("prev-btn");
    var nextBtn = document.getElementById("next-btn");
    var autoSwitch; // 记录自动切换的setInterval

    // 上一张照片
    prevBtn.addEventListener("click", function () {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = photos.length - 1;
        }
        updateCurrentPhoto();
        currentPhoto.classList.add("fade-in-out");
        setTimeout(function () {
            currentPhoto.classList.remove("fade-in-out");
        }, 1000);
    });

    // 下一张照片
    nextBtn.addEventListener("click", function () {
        currentIndex++;
        if (currentIndex >= photos.length) {
            currentIndex = 0;
        }
        updateCurrentPhoto();
        currentPhoto.classList.add("fade-in-out");
        setTimeout(function () {
            currentPhoto.classList.remove("fade-in-out");
        }, 1000);
    });

    // 设置自动切换照片
    autoSwitch = setInterval(function () {
        // 切换下一张照片
        currentIndex++;
        if (currentIndex >= photos.length) {
            currentIndex = 0;
        }
        updateCurrentPhoto();
        currentPhoto.classList.add("fade-in-out");
        setTimeout(function () {
            currentPhoto.classList.remove("fade-in-out");
        }, 1000);
    }, 4000);

    // 鼠标移动到照片上面，自动切换暂停
    currentPhoto.addEventListener("mouseover", function () {
        clearInterval(autoSwitch);
    });

    // 鼠标移开照片，自动切换继续
    currentPhoto.addEventListener("mouseout", function () {
        autoSwitch = setInterval(function () {
            // 切换下一张照片
            currentIndex++;
            if (currentIndex >= photos.length) {
                currentIndex = 0;
            }
            updateCurrentPhoto();
            currentPhoto.classList.add("fade-in-out");
            setTimeout(function () {
                currentPhoto.classList.remove("fade-in-out");
            }, 1000);
        }, 4000);
    });














}