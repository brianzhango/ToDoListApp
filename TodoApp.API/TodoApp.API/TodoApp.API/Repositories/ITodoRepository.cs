using TodoApp.API.Models;

namespace TodoApp.API.Repositories
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAll();
        Todo? GetById(Guid id);
        void Add(Todo item);
        bool Delete(Guid id);
    }
}
