import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '@material-ui/core';

export default function NotificationBox(props) {
    const [open, setOpen] = React.useState(props.isNotify);
    const [comment, setComment] = useState('');

    const handleClose = () => {
      setOpen(false);
      props.closeCallback(true, comment);
    };
  
    const commentOnChange = e => {
      setComment(e.target.value);
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {!props.isDeclined ?
            "Уведомление!"
          :
            "Комментарий"
          }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {!props.isDeclined ?
                props.message
              :
                <Input
                  type="text"
                  onChange={commentOnChange}
                />
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!props.isDeclined ?
              <Button onClick={handleClose} color="primary" autoFocus>
                Закрыть
              </Button>
            :
              <Button onClick={handleClose} color="primary" autoFocus>
                Отправить
              </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }