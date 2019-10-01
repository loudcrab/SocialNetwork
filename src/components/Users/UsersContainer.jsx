import React from 'react';
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setTotalUsersCount,
    setUsers,
    unFollow
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Users from './Users';
import loading from '../../assets/images/loading.gif'
import Preloader from "../common/Preloader/Preloader";

class UsersAPIComponent extends React.Component {

    getUsers() {

        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count${this.props.pageSize}`).then(response => {
            this.props.setIsFetching(false)
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.getUsers();
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : <Users totalUsersCount={this.props.totalUsersCount}
                                                           pageSize={this.props.pageSize}
                                                           currentPage={this.props.currentPage}
                                                           onPageChanged={this.onPageChanged}
                                                           users={this.props.users}
                                                           follow={this.props.follow}
                                                           unFollow={this.props.unFollow}
            />}

        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


export default connect(mapStateToProps,
    {
        follow,
        unFollow,
        setUsers,
        setIsFetching,
        setTotalUsersCount,
        setCurrentPage
    })(UsersAPIComponent);