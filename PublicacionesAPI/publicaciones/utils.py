import requests
def get_user_data(token):
    try:
        response = requests.get(
            'http://usuariosapi:8000/api/user_data/',
            headers={'Authorization': f'Bearer {token}'}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as error:
        print(error)