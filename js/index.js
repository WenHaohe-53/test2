// AMD 当前模块依赖main.js中的另外两个个模块
define(['jquery', 'jquery-cookie'], function($) {
    var main = function() {
        $(function() {
            $.ajax({
                url: './data/data.json',
                type: 'GET',
                success: function(res) {
                    var html = '';
                    for (var i = 0; i < res.length; i++) {
                        html += `<li class="goods_item">
                                        <div class="goods_pic">
                                            <img src="${res[i].img}" width="200" height="150">
                                        </div>
                                        <div class="goods_title">
                                            JD 京东超市
                                        </div>
                                        <div class="sc">
                                            <div class="sc_btn" id="${res[i].id}">
                                                加入购物车
                                            </div>
                                        </div>
                                    </li>`
                    }
                    $('.goods_box ul').html(html);
                },
                error: function(error) {
                    alert(error);
                }
            });
            let sum = 0;
            // 事件委托 异步下载数据未完全更新
            $('.goods_box').on('click', '.sc_btn', function() {

                var id = this.id;
                var first = $.cookie('goods') == null ? false : true;
                console.log(first);
                if (!first) {
                    $.cookie('goods', `[{id:${id},num:1}]`, {
                        expires: 7, //设置过期时间
                        raw: true
                    });
                    //设置过期时间						 
                } else {
                    var str = $.cookie('goods');
                    console.log(str);
                    var arr = eval(str);
                    console.log(arr);
                    var same = false;

                    for (var i in arr) {
                        if (arr[i].id == id) {
                            arr[i].num += 1;
                            var cookieStr_1 = JSON.stringify((arr));
                            $.cookie('goods', cookieStr_1, {
                                expires: 7,
                                raw: true
                            });
                            same = true;
                            break;
                        }
                    }

                    if (!same) {
                        var obj = { id: id, num: 1 }
                        arr.push(obj);
                        var cookieStr_2 = JSON.stringify(arr);
                        $.cookie('goods', cookieStr_2, {
                            expires: 7,
                            raw: true
                        });
                    }
                }
                sum = 0;
                sc_msg();

            });

            $('.sc_right').mouseenter(function() {
                $(this).css("right", 0);
            });
            $('.sc_right').mouseleave(function() {
                $(this).css("right", -270);
            });


            function sc_msg() {
                $.ajax({
                    url: './data/data.json',
                    type: 'GET',
                    success: function(res) {
                        var sc_arr = eval($.cookie('goods'));
                        var html = '';
                        for (var i in sc_arr) {
                            html += `<li>
                                    <div class="sc_goodsPic">
                                        <img src="${res[sc_arr[i].id].img}">
                                    </div>
                                    <div class="sc_goodsTitle">
                                        <p>商品标题</p>
                                    </div>
                                    <div class="sc_goodsBtn">
                                        购买
                                    </div>
                                    <div class="sc_goodsNum">
                                         商品数量: ${sc_arr[i].num}
                                    </div>
                                </li>`
                            sum += sc_arr[i].num;
                        }
                        $('.sc_right ul').html(html);
                        $('.sc_num').html(sum);

                    }
                })
            }
            sc_msg();

        });




    }
    return {
        main: main

    }


});