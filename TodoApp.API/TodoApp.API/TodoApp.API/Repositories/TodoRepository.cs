using System.Xml.Linq;
using TodoApp.API.Models;

namespace TodoApp.API.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly List<Todo> _items = new();

        public IEnumerable<Todo> GetAll() => _items;

        public Todo? GetById(Guid id) => _items.FirstOrDefault(x => x.Id == id);

        public void Add(Todo item)
        {
            _items.Add(item);
        }

        public bool Delete(Guid id)
        {
            var it = GetById(id);
            if (it is null) return false;
            _items.Remove(it);
            return true;
        }
    }
}
