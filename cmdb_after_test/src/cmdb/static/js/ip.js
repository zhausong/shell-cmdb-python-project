;var ipops = {    bindevents: function () {        $("#addips").click(function(){            ipops.msgtips("");            $("#ip").val("");            $("#ipdiv").foundation('reveal', 'open');        });        $("#ipbtn").click(function () {            var ip = $.trim($("#ip").val());            if (ip.length<=0) {                ipops.msgtips("请填写有效的ip或者ip段:10.10.3.0/24");                return false;            }            tmprange = ip.split(".");            if (tmprange.length != 4) {                ipops.msgtips("请填写有效的ip或者ip段:10.10.3.0/24");                return false;            }            ipintrange = parseInt(tmprange[0]);            if (isNaN(ipintrange) || ipintrange < 0 || ipintrange > 256) {                ipops.msgtips("操作提示:第一段不对,请填写有效的ip或者ip段:10.10.3.0/24");                return false;            }            ipintrange = parseInt(tmprange[1]);            if (isNaN(ipintrange) || ipintrange < 0 || ipintrange > 256) {                ipops.msgtips("操作提示:第二段不对,请填写有效的ip或者ip段:10.10.3.0/24");                return false;            }            ipintrange = parseInt(tmprange[2]);            if (isNaN(ipintrange) || ipintrange < 0 || ipintrange > 256) {                ipops.msgtips("操作提示:第三段不对,请填写有效的ip或者ip段:10.10.3.0/24");                return false;            }            if (tmprange[3].indexOf("/") < 0) {                ipintrange = parseInt(tmprange[3]);                if (isNaN(ipintrange) || ipintrange < 0 || ipintrange > 256) {                    ipops.msgtips("操作提示:第四段不对,请填写有效的ip或者ip段:10.10.3.0/24");                    return false;                }            }                ipops.msgtips("");                $.ajax({                    'url': '/cmdb/ip/add',                    'type': 'post',                    'dataType': 'json',                    'data': {'ip': ip},                    success: function (res) {                         if (res.code == 1) {                            ipops.msgtips(res.msg,0);                        } else {                            ipops.msgtips(res.msg,1);                            $("#ipdiv").foundation('reveal', 'close');                            window.location.href = window.location.href;                        }                    }                })        })    },    msgtips: function (msg, type) {        if (msg) {            if (type == 0) {                $("#msgtips").removeClass("success");                $("#msgtips").addClass("alert");            } else if (type == 1) {                $("#msgtips").removeClass("alert");                $("#msgtips").addClass("success");            }            $("#msgtips").html(msg);            $("#msgtips").show();        } else {            $("#msgtips").hide();        }    }};$(document).ready(function () {    ipops.bindevents();});