$(function(){
    $('#slidebar').on('click', 'li', function(e){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $.fn.pageScrolling = function(sec,btn, t, cb) {
        // sec - 切换页面的class
        // btn - 切换页面的btn
        // cb  - 页面切换后的回调函数
        // t   - 页面切换时间, 默认 1000ms
        var page = 0;
        var $btn = $(btn);
        var $secs = $(sec);
        var $con = $(this);
        var pagesLength = $secs.length;
        t = t || 1000;
        // 当前页面切换
        function up(){
            page++;
            if(page == pagesLength){ page = 0; }
        }
        function down(){
            page--;
            if(page < 0){ page = pagesLength - 1; }
        }
        $btn.each(function(index) {
            $(this).click(function(){
                page=index;
                scrolling();
            })
        });
        /*页面滑动*/
        function scrolling(){
            $btn.eq(page).addClass('active').siblings().removeClass('active');
            $secs.removeClass('active');
            $secs.eq(page).addClass('active');
        }
        $con.one('mousewheel',mouseScroll);
        function mouseScroll(event){
            if(event.deltaY<0) {
                up();
            } else{
                down();
            }
            scrolling();
            setTimeout(function(){
                $con.one('mousewheel',mouseScroll);
            },t);
        }

        /*响应键盘上下键*/
        $(document).one('keydown',keyDown);
        function keyDown(event){
            var e = event || window.event;
            var key = e.keyCode || e.which||e.charCode;
            switch(key)	{
                case 38: down();run();
                    break;
                case 40: up();run();
                    break;
            }
            setTimeout(function(){$(document).one('keydown',keyDown)},t);
        }
    };

    $('#container').pageScrolling('.stage', '#slidebar li');
});