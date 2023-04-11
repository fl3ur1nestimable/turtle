import React from 'react';

class Liste extends React.Component{
    componentDidMount(){
        this.props.updateList();
    }

    render(){
        return(
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
                            <tr key={index}>
                                <td>{task.author}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.price}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Liste;