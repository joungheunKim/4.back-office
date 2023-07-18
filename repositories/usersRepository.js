const { Users } = require('../models');
const { Op } = require('sequelize');

class UsersRepository {
  findUserByOrOption = async (login_id, nickname) => {
    const user = await Users.findOne({
      where: { [Op.or]: [{ login_id }, { nickname }] },
    });

    return user;
  };

  createUser = async (login_id, nickname, password, pet_name) => {
    const user = await Users.create({ login_id, nickname, password, pet_name });

    return user;
  };

  findUserByLogin_id = async (login_id) => {
    const user = await Users.findOne({ where: { login_id } });

    return user;
  };

  findUserByPk = async (user_id) => {
    const user = await Users.findByPk(user_id);

    return user;
  };

  deleteUser = async (user_id) => {
    Users.destroy({ where: { user_id } });
  };
}

module.exports = UsersRepository;
