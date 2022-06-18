// ------ usercircleItem  ------
import React, { useEffect, useState, useContext } from 'react';
import './UserCircleItem.scss';
import { updateMember } from '../../../../../services/AuthService';
import { UserContext } from '../../../../../App';
import LetteredAvatar from 'react-lettered-avatar';

//Images
import cresteraIconsV2Board from '../../../../../assets/images/cresteraIconsV2/cresteraIconsV2-Board.png';
import cresteraIconsV2Note from '../../../../../assets/images/cresteraIconsV2/cresteraIconsV2-Note.png';
import profilePic from '../../../../../assets/images/other/profilePicture.jpg';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faUserFriends,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

const UserCircleItem = ({ usercircleMembers, usercircleId ,refresh , setRefresh}) => {
  const { state, dispatch } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    setMembers(usercircleMembers);
    console.log(usercircleMembers);
  }, [usercircleMembers]);

  const handleUpdateMember = async (memberId, isAdmin) => {
    try {
      const response = await updateMember({
        memberId: memberId,
        isAdmin: isAdmin,
      });
      console.log(response);
      setRefresh(!refresh);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {members &&
        members.map((member) => (
          <>
            <div key={member._id} className="usercircleItem" disabled>
              <div className="usercircleItem__fileIcon">
              <LetteredAvatar size={50} 
            name={`${member.member && member.member.firstName} ${member.member && member.member.lastName} `}
        />
              </div>
              <div className="usercircleItem__fileName">
                <p>
                  {member.member && member.member.firstName}{' '}
                  {member.member && member.member.lastName}
                </p>
              </div>
              <div className="usercircleItem__middleIcon">
                <div className="usercircleItem__middleIcon__container">
                  <FontAwesomeIcon icon={faUserFriends} />
                </div>
              </div>
              <div className="usercircleItem__title1">
                <p>
                  {member.isOwner
                    ? 'Owner'
                    : member.isAdmin
                    ? 'Admin'
                    : member.isPending
                    ? 'Pending'
                    : 'Member'}
                </p>

                {member.isOwner == true && (
                  <FontAwesomeIcon className="user_owner" icon={faCrown} />
                )}
              </div>
              <div className="usercircleItem__title2">
                {member.isAdmin == false && member.isOwner == false && (
                  <button onClick={() => handleUpdateMember(member._id, true)}>
                    Make Admin
                  </button>
                )}
                {member.isAdmin == true && member.isOwner == false && (
                  <button onClick={() => handleUpdateMember(member._id, false)}>
                    Remove Admin
                  </button>
                )}
              </div>
              <div className="usercircleItem__setings">
                <div className="usercircleItem__setings__container">
                  <button className="usercircle_remove_button">
                    <span>REMOVE</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default UserCircleItem;
