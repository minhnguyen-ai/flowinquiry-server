import React, {Component} from 'react';
import IUserData from "./types/IUserData";
import UserService from "./services/UserService";

type Props = {};

type State = {
    users: Array<IUserData>,
    currentTutorial: IUserData | null,
    currentIndex: number,
    searchTitle: string
};

export default class UserList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        UserService.findAll().then((response: any)=> {
            this.setState({
                users: response.data
            });
        }). catch((e: Error) => {
            console.log(e);
        })
    }

    render() {
        const { searchTitle, users, currentTutorial, currentIndex } = this.state;

    }
}