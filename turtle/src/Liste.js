import React from 'react';

class Liste extends React.Component {
    componentDidMount() {
        this.props.updateList();
    }

    acceptation = (task) => {
        this.props.acceptTask(task.id);
    }

    render() {
        var token = this.props.token;
        return (
            <div className='tasks'>
                <table>
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map((task, index) => (
                            task.author !== this.props.user ?
                            <tr key={index}>
                                <td>{task.author}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.price}</td>
                                <td>{task.status}</td>
                                {
                                    token && token !== "" && token !== undefined ?
                                    <td>
                                        {
                                            task.status === 'Posted' ?
                                                <button onClick={() => this.acceptation(task)}>Accepter</button>
                                                : null
                                        }
                                    </td> : null
                                }
                            </tr> : null
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Liste;
