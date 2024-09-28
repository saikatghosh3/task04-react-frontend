import { forwardRef } from 'react';
import { Popover, ListGroup } from 'react-bootstrap';
import BoxArrowRight from '../../icons/box-arrow-right.svg?react';
import { useNavigate } from 'react-router-dom';
import {useUser} from "../../../hooks/use-user";
import { paths } from '../../../paths';
import { getAuthClient } from '../../../services/auth';
import { getFullName } from '../../../utils/user';
// Wrap the component using React.forwardRef
// eslint-disable-next-line react/display-name
export const UserPopover = forwardRef((props, ref) => {
    const {onClose} = props;
      const { checkSession, user } = useUser();
      const navigate = useNavigate();
    
      const handleSignOut = async () => {
        try {
          const { error } = await getAuthClient().signOut();
          if (error) {
            console.error('Sign out error', error);
            return;
          }
          onClose();
          await checkSession?.();
          navigate(paths.auth.signIn);
        } catch (err) {
          console.error('Sign out error', err);
        }
      };
    return ((
        <Popover
            {...props}
            ref={ref}
            >
          <Popover.Header>
            <strong> {getFullName(user)} </strong>
            <br />
            <small className="text-muted">{user && user.email? user.email: null}</small>
          </Popover.Header>
          <Popover.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={handleSignOut}>
                <BoxArrowRight className="me-2" /> Sign out
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      ))
});
