namespace TodoApp.API.Models
{
    public class Todo
    {
        public Guid Id { get; set; }

        public required string ItemName { get; set; }

        public DateTime CreatedDateTime { get; set; }

    }
}
