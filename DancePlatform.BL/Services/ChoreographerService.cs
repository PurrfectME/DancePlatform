﻿using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
    public class ChoreographerService : IChoreographerService
    {
        private readonly IApplicationContext _context;

        public ChoreographerService(IApplicationContext context)
        {
            _context = context;
        }

        public Task Create(Choreographer entity)
        {
            _context.Choreographers.AddAsync(entity);

            return _context.SaveChangesAsync();
        }

        public Task Delete(Choreographer entity)
        {
            _context.Choreographers.Remove(entity);

            return _context.SaveChangesAsync();
        }

        public Task Delete(List<Choreographer> entities)
        {
            _context.Choreographers.RemoveRange(entities);

            return _context.SaveChangesAsync();
        }

        public Task<List<Choreographer>> GetAll()
        {
            return _context.Choreographers.ToListAsync();
        }

        public Task<Choreographer> GetById(int id)
        {
            return _context.Choreographers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task Update(Choreographer entity)
        {
            _context.Choreographers.Update(entity);

            return _context.SaveChangesAsync();
        }
    }
}