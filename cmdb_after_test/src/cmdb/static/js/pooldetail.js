;var pooldetail={    bingevents:function(){        var that=this;        $(".host_remove").each(function(){           $(this).click(function(){               var ids=$(this).prop("id").split("_");               var hostid = ids[0];               var pool_host_id = ids[1];               var poolid = ids[2]                 $.ajax({                        url: "/cmdb/pool/check_pool_host",                        data:{'hostid':hostid,'poolid':poolid},                        type: 'POST',                        dataType: "json",                        success: function (res) {                            if(res.code == 0){                                var hostname = res.data[0];                                var num = res.data[1].length;                                var select = '';                                 for (var i = 0; i < num; i++) {                                     var val = res.data[1][i].split('_');                                     select = select + '<option value="' + val[0] + '" >' + val[1]+ '</option>';                                 }                                $("#add-host").foundation('reveal', 'open');                                $(".pool").html(                                    '<div data-alert class="alert-box alert" id="msgtips" style="display: none;"> This is an alert - alert that is rounded.' +                                    '<a href="#" class="close">&times;</a>' +                                    '</div>' +                                    '<span>主机名称: '+hostname+'</span></br>'+                                     '<div class="pool" style="margin-top:20px">' +                                    '<select id="select_pool_id" name="pool_id">'+                                    '<option selected="selected" value="0">请选择POOL</option>'+select+'</select>' +                                    '</div>'+                                     '<div class="row">'+                                    '<div class="large-10 columns">'+                                    '<span style="fonts-size:13px">'+'Notice:&nbsp;&nbsp'+'<span style="color:red">'+hostname+'只有一个POOL,移除前请将'+hostname+'放入其他POOL' +'</span>'+'</span>'+                                    '</div>'+                                    '<div class="large-2 columns" >'+                                     '<button  class="button right tiny" id="check">确定</button>'+                                     '</div>'+                                     '</div>'                                );                                that.check_select(hostid,pool_host_id);                            }else{                                   that.deletehostfrompool(pool_host_id,0);                            }                        }                 });           })        });    },    check_select:function(hostid,pool_host_id){        $("#check").each( function() {             $(this).click(function () {                 var poolid = $.trim($("#select_pool_id").val());                 if (poolid == 0)                 {                    msgtips("请选择POOL");                    return false                 }else{                     $.ajax({                        'url': '/cmdb/pool/host/add',                        'type': 'post',                        'dataType': 'json',                        'data': {'host_ids':hostid,'pool_id':poolid},                        success: function (res) {                            if (res.code == 1) {                                msgtips(res.msg, 0);                            } else {                                msgtips(res.msg, 1);                                $("#add-host").foundation('reveal', 'close');                                pooldetail.deletehostfrompool(pool_host_id,1);                            }                        }                    });                 }             });        });    },    deletehostfrompool:function(pool_host_id,type){        if (type != 1)        {             if(!confirm("操作提示\r\n移除主机之后不可恢复")){                 return ;             }        }        pid= $.trim($("#pool_id").val());         $.ajax({                url: "/cmdb/pool/host/delete",                data:{'id':pool_host_id,'pid':pid},                type: 'POST',                dataType: "json",                success: function (res) {                    window.location.href = window.location.href;                }         });    }};function msgtips(msg, type){            if (msg) {                if (type == 0) {                    $("#msgtips").removeClass("success");                    $("#msgtips").addClass("alert");                } else if (type == 1) {                    $("#msgtips").removeClass("alert");                    $("#msgtips").addClass("success");                }                $("#msgtips").html(msg);                $("#msgtips").show();            } else {                $("#msgtips").hide();            }     }$(document).ready(function(){    pooldetail.bingevents();});