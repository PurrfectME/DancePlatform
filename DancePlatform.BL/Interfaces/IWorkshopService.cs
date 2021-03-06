﻿using DancePlatform.BL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IWorkshopService
	{
		Task<Workshop> Create(Workshop entity);
		Task<Workshop> Update(Workshop entity);
		Task Delete(Workshop entity);

		Task<List<Workshop>> GetAll(int organizerId);
		Task<List<Workshop>> GetAllForUsersAccounting(int organizerId);
		Task<List<User>> GetWorkshopUsers(int workshopId);
        Task<Workshop> GetById(int id);
		Task<List<Workshop>> GetUserDesiredWorkshops(int userId);
		Task<List<Workshop>> GetClosed(int organizerId);
		Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId, DateTimeOffset? dateOfBirth);
		Task<List<Workshop>> GetWorkshopsForApproval();

		Task ApproveWorkshop(int workshopId);
		Task DeclineWorkshop(int workshopId, string comment);
	}
}
