export const validation = {
  required: value => Boolean(value) || 'Поле обязательно',
  maxRoomNameLength: length => value =>
    value.length <= length || `Название комнаты не должно быть длиннее ${length} символов`,
  maxUsernameLength: length => value => value.length <= length || `Имя не должно быть длиннее ${length} символов`,
  maxMessageLength: length => value => value.length <= length || `Сообщение не должно быть длиннее ${length} символов`,
};
