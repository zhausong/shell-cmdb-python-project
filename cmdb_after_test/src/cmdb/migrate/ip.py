# -*- coding: utf-8 -*-#找小陆要网段 直接生成from sqlalchemy import *from config import MIGRATE_DATABSE_URIfrom application import dbfrom models.ip_address import IpAddressfrom application import dbimport re,IPyclass ipmigrate:    def run(self):        tmplist=[            "10.0.1.0/24",            "10.10.2.0/24",            "10.10.3.0/24",            "10.10.4.0/24",            "10.10.5.0/24",            "10.10.6.0/24",            "10.10.7.0/24",            "10.10.8.0/24",            "10.10.9.0/24",            "10.20.1.0/24",            "10.20.2.0/24",            "10.20.3.0/24",            "10.20.5.0/24",            "10.20.6.0/24",            "10.20.7.0/24",            "10.20.8.0/24",            "10.20.9.0/24",            "10.20.10.0/24",            "10.20.23.0/24",            "114.80.230.192/26",            "58.247.138.64/27",            "180.153.87.48/28",            "10.11.6.0/24",            "114.80.129.40/29",            "58.247.176.0/30",            "203.166.169.0/27",            "211.152.55.96/27",            "222.73.66.224/28",            "192.168.1.0/24",            "192.168.161.0/24",            "192.168.20.0/24",            "192.168.201.0/24"        ]        iplist=[]        for item in tmplist:            networkAddress = IPy.IP(item)            for i in networkAddress:                i = str(i)                iplist.append(i)            for itemip in iplist:                hasin=IpAddress.query.filter(IpAddress.ipv4==itemip).first()                if hasin:                    continue                tmparr=itemip.split(".")                if int(tmparr[3])>10 and int(tmparr[3])<250:                    iptarget=IpAddress(itemip,0)                else:                    iptarget=IpAddress(itemip,2)                db.session.add(iptarget)                db.session.commit()