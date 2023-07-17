const { Users, Sitters } = require('../models');
const { Op } = require('sequelize');

class SittersRepository {
  create = async (login_id, nickname, password, career, category) => {
    return await Sitters.create({
      login_id,
      nickname,
      password,
      career,
      category,
    });
  };

  findOne = async (target) => {
    return await Sitters.findOne({where:{[Op.and]: target}, raw:true, nest:true});
  }
}

module.exports = SittersRepository;
