using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TodoApp.API.Models;
using TodoApp.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITodoRepository, TodoRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

// Allow Angular dev server
var allowedOrigin = "http://localhost:4200";
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

var repo = app.Services.GetRequiredService<ITodoRepository>();

app.MapGet("/todos", () => Results.Ok(repo.GetAll()));

app.MapGet("/todos/{id}", ([FromRoute] Guid id) =>
{
    var item = repo.GetById(id);
    return item is null ? Results.NotFound() : Results.Ok(item);
});

app.MapPost("/todos", async ([FromBody] TodoItemCreateDto dto) =>
{
    var item = new Todo { Id = Guid.NewGuid(), ItemName = dto.ItemName, CreatedDateTime = DateTime.UtcNow};
    repo.Add(item);
    return Results.Created($"/todos/{item.Id}", item);
});

app.MapDelete("/todos/{id}", ([FromRoute] Guid id) =>
{
    var removed = repo.Delete(id);
    return removed ? Results.NoContent() : Results.NotFound();
});

app.Run();

// DTOs and small records
public class TodoItemCreateDto
{
    public string ItemName { get; set; }

}