# -*- coding: utf-8 -*-

from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, TIMESTAMP
from sqlalchemy.dialects.mysql import TINYINT
from application import db
import datetime

class Tickets(db.Model):
    __tablename__ = "tickets"
    id      = Column(Integer, primary_key=True)
    uid     = Column(Integer, nullable=False,index=True)
    status  = Column(TINYINT(1),nullable=False)
    created = Column(TIMESTAMP, nullable=False,server_default='0000-00-00 00:00:00')
    updated = Column(TIMESTAMP, nullable=False,server_default='0000-00-00 00:00:00')

    STATUS_CLOSED = 2
    STATUS_OPEN = 1

    def __init__(self,uid = 0,status = 1,created = ''):
        self.uid  = uid
        self.status = status
        if created:
            self.created = created
        else:
            self.created = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.updated = self.created

    @property
    def status_desc(self):
        desc = '处理中'
        if self.status == 2:
            desc = '已关闭'
        return desc
